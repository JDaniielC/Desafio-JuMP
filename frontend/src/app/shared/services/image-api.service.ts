import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable()
export class ImageApiService {
  public flowchart: BehaviorSubject<SafeHtml> = new BehaviorSubject<SafeHtml>('');
    constructor(
        private readonly http: HttpClient,
        private sanitizer: DomSanitizer
    ) { }

	public getFlowGraph() {
    return this.flowchart.asObservable();
	}

  public fetchFlowGraph() {
		return this.http.get('/api/visualization/image/', {
			responseType: 'text',
        }).pipe(take(1),
                map((res: string) =>
                    this.sanitizer.bypassSecurityTrustHtml(res)
        ))
  }
}
