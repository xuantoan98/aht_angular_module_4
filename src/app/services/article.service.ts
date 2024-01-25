import { Injectable } from "@angular/core";
import { Observable, map, of, shareReplay } from "rxjs";
import { IArticle } from "../models/article";

@Injectable({
    providedIn: 'root'
})

export class ArticleService {
    constructor() {}
    
    get articles$() {
        return of<IArticle[]>([
            { title: 'Title 1', body: 'This is body title 1', slug: 'title-1' },
            { title: 'Title 2', body: 'This is body title 2', slug: 'title-2' }
        ]).pipe(shareReplay(1));
    }

    getArticle(slug: string): Observable<IArticle> {
        return this.articles$.pipe(map(articles => articles.find(ar => ar.slug === slug) as IArticle))
    }
}
