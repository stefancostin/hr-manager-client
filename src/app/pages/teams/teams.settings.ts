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
      projects: {
        title: 'Projects',
        type: 'string',
        width: '175px',
        valuePrepareFunction: (projectCollection) => {
          if (projectCollection.length) {
            let projects: string = '';
            for (let i = 0; i < projectCollection.length; i++) {
              projects += projectCollection[i].code.toLocaleUpperCase() + ', ';
            }
            projects.toLocaleUpperCase();
            return projects.slice(0, -2);
          }
          return null;
        }
      },
    },
  };
}
