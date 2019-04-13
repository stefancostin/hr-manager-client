export class CompetenceCentersTableSettings {
    settings = {
      mode: 'external',
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        position: 'right',
      },
      columns: {
        code: {
          title: 'Code',
          type: 'string',
          width: '100px'
        },
        city: {
          title: 'City',
          type: 'string',
        },
        country: {
          title: 'Country',
          type: 'string',
        },
      },
    };
  }
