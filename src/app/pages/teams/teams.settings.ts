export class TeamsTableSettings {
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
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        width: '30px',
      },
      code: {
        title: 'Code',
        type: 'string',
        width: '100px'
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      competence_center: {
        title: 'Competence Center',
        type: 'string',
        width: '175px',
        valuePrepareFunction: (competenceCenter) => {
          return competenceCenter.code;
        }
      },
    },
  };
}
