import { Injectable } from '@angular/core';

export class TranslationSet {
  public languange: string;
  public values: { [key: string]: string } = {};
}

@Injectable()
export class TranslationService {
  public languages = ['en', 'ar'];

  public language = 'en';

  private dictionary: { [key: string]: TranslationSet } = {
    ar: {
      languange: 'ar',
      values: {
        LAYOUTS: 'التخطيطات',
        CREATE_NEW_LAYOUT: 'إنشاء تخطيط جديد',
        WIDGETS: 'الحاجيات',
        SAVED_WIDGETS: 'الحاجيات المحفوظة',
        PROPERTIES: 'الخصائص',
        SAVE_LAYOUT: 'حفظ التخطيط',
        LAYOUT_NAME: 'اسم التصميم',
        LAYOUT_ID: 'معرف التخطيط',
        CANCEL: 'يلغي',
        DRAG_WIDGET_HERE: 'اسحب القطعة هنا',
        DELETE_WIDGET: 'حذف القطعة'
      }
    },
    en: {
      languange: 'en',
      values: {
        LAYOUTS: 'Layouts',
        CREATE_NEW_LAYOUT: 'Create New Layout',
        WIDGETS: 'Widgets',
        SAVED_WIDGETS: 'Saved Widgets',
        PROPERTIES: 'Properties',
        SAVE_LAYOUT: 'Save Layout',
        LAYOUT_NAME: 'Layout Name',
        LAYOUT_ID: 'Layout ID',
        CANCEL: 'Cancel',
        DRAG_WIDGET_HERE: 'Drag Widget here',
        DELETE_WIDGET: 'Delete Widget'
      }
    }
  };

  constructor() {}

  translate(value: string): string {
    //console.log('translate called with value ' + value + ' and language ' + this.language);
    if (this.dictionary[this.language] != null) {
      return this.dictionary[this.language].values[value];
    } else {
      return value;
    }
  }
}
