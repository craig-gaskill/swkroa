import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../core/dictionary/dictionary';
import {DictionaryService} from '../../../core/dictionary/dictionary-service';

@Component({
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionariesComponent implements OnInit {
  public dictionaries: Observable<Dictionary[]>;
  public expandedMeaning: string;

  constructor(private _dictionaryService: DictionaryService
  ) { }

  public ngOnInit() {
    this.dictionaries = this._dictionaryService.getDictionaries(0, 0);
  }

  public onExpandDictionary(meaning: string): void {
    this.expandedMeaning = meaning;
  }
}
