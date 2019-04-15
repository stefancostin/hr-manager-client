export class ProjectsTableSettings {
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
      teams: {
        title: 'Teams',
        type: 'string',
        valuePrepareFunction: (teamCollection) => {
          if (teamCollection && teamCollection.length) {
            let teams: string = '';
            for (let i = 0; i < teamCollection.length; i++) {
              teams += teamCollection[i].code.toLocaleUpperCase() + ', ';
            }
            teams.toLocaleUpperCase();
            return teams.slice(0, -2);
          }
          return null;
        },
        filterFunction: (teams: any, search: string) => {
          if (teams && teams.length) {
            let bool = false;
            for (let i = 0; i < teams.length; i++) {
              if (teams[i].code.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                bool = true;
              }
            }
            return bool;
          }
        },
      },
    },
  };
}
