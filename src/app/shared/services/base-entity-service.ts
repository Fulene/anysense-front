import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseEntityService<T> {
  protected API_ENDPOINT = environment.apiHost;

  protected constructor(
    protected entityPath: string,
    protected http: HttpClient
  ) {
    this.API_ENDPOINT += entityPath;
  }

  public findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_ENDPOINT}/all`);
  }

  public findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_ENDPOINT}/${id}`);
  }

}
