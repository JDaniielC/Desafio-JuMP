from fastapi import APIRouter
from schemas import LogStats, Processo
from typing import List
from modules.core import (core_instance, CASE_ID,
    END_TIMESTAMP, START_TIMESTAMP, ACTIVITY
)

router = APIRouter(
    prefix="/api/processos",
    tags=['processos'],
    responses={404: {"processos": "Not found"}}
)

@router.get("/stats/", status_code=200, response_model=LogStats)
async def get_log_stats():
    """
    Returns statistics about the log:
    casesCount: NPU (unique cases) count
    movimentosCount: Total movimentos count
    avgMovimentosPerCase: Average movimentos per case
    avgCaseDuration: Average case duration, in seconds
    avgMovimentoDuration: Average movimento duration, in seconds
    {
        casesCount: int,
        movimentosCount: int,
        avgCaseDuration: seconds,
        avgMovimentosPerCase: float,
        avgMovimentoDuration: seconds
    }
    """
    df = core_instance.log.copy()
    df['duration'] = core_instance.log[END_TIMESTAMP] - core_instance.log[START_TIMESTAMP]

    movimentos_count = len(df)
    cases_count = len(df[CASE_ID].unique())
    avg_movimento_duration = df['duration'].mean()
    avg_movimentos_per_case = movimentos_count / cases_count
    case_duration_sum = df.groupby(CASE_ID)['duration'].sum().mean()

    response = LogStats(
        casesCount=cases_count,
        movimentosCount=movimentos_count,
        avgCaseDuration=case_duration_sum,
        avgMovimentosPerCase=avg_movimentos_per_case,
        avgMovimentoDuration=avg_movimento_duration
    )

    return response

@router.get("/", status_code=200, response_model=List[Processo])
async def get_processos_infos(movimento: str = None):
    """
    Returns a list of all processos with some stats and a count
    of how many times the given movimento happened.
    """
    pinned_movimento = movimento
    df =core_instance.log.copy()
    df['duration'] = df[END_TIMESTAMP] - df[START_TIMESTAMP]
    cases = []

    for NPU, group in df.groupby(CASE_ID):
        trace_duration = group['duration'].sum()
        pinned_movimento_count = len(
            group[group[ACTIVITY] == pinned_movimento]
        )
        cases.append(Processo(
            NPU=NPU,
            movimentosCount = len(group),
            duration = trace_duration.total_seconds(),
            pinnedMovimentoCount = pinned_movimento_count
        ))

    return cases
