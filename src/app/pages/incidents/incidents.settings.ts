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
      },
      subject: {
        subject: 'Subject',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      project_id: {
        title: 'Project',
        type: 'string',
      },
      employee_id: {
        title: 'Assigned To',
        type: 'string',
      },
    },
  };
}
