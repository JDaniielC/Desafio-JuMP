import { ImageApiService } from "./image-api.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

describe('ImageApiService', () => {
  let imageApiService: ImageApiService;
  let httpMock: HttpTestingController;
  let sanitizerMock: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageApiService, { provide: DomSanitizer, useValue: sanitizerMock }]
    });

    imageApiService = TestBed.inject(ImageApiService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  });


  it('should fetch the flow graph from the API', () => {
    const mockResponse = '<svg><circle cx="50" cy="50" r="30"></circle></svg>'
    const mockSanitizedResponse = 'Sanitized HTML';

    sanitizerMock.bypassSecurityTrustHtml.and.returnValue(mockSanitizedResponse);

    imageApiService.fetchFlowGraph().subscribe((res) => {
      expect(res).toEqual(mockSanitizedResponse);
    });

    const req = httpMock.expectOne('/api/visualization/image/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalled();
    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockResponse);
  })
});
