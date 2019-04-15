export class IncidentsTableSettings {
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
      subject: {
        title: 'Subject',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      project: {
        title: 'Project',
        type: 'string',
        width: '100px',
        valuePrepareFunction: (project) => {
          return project.code;
        },
        filterFunction: (project: any, search: string) => {
          if (project.code.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return true;
          }
        },
      },
      employee: {
        title: 'Assigned To',
        type: 'string',
        valuePrepareFunction: (employee) => {
          return `${employee.first_name} ${employee.last_name}`;
        },
        filterFunction: (employee: any, search: string) => {
          const name = employee.first_name.toLocaleLowerCase() + ' ' + employee.last_name.toLocaleLowerCase();
          if (name.includes(search.toLocaleLowerCase())) {
            return true;
          }
        },
      },
      is_solved: {
        title: 'Solved',
        type: 'boolean',
        width: '60px',
        valuePrepareFunction: (value) => value === 1 ? 'Y' : 'N',
        filterFunction: (solved: any, search: string) => {
          if (solved === 1 && (search === 'Y' || search === 'y') ||
              solved === 0 && (search === 'N' || search === 'n')) {
            return true;
          }
        },
      },
    },
  };
}
