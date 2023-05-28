from pandas import Timedelta
from pydantic import BaseModel

class LogStats(BaseModel):
    casesCount: int
    movimentosCount: int
    avgCaseDuration: Timedelta
    avgMovimentosPerCase: float
    avgMovimentoDuration: Timedelta
