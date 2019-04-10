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
        }
      },
      employee: {
        title: 'Assigned To',
        type: 'string',
        valuePrepareFunction: (employee) => {
          return `${employee.first_name} ${employee.last_name}`;
        }
      },
    },
  };
}
