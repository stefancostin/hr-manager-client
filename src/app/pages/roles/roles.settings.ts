export class RolesTableSettings {
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
      is_management: {
        title: 'Management',
        type: 'boolean',
        width: '60px',
        valuePrepareFunction: (value) => value === 1 ? 'Y' : 'N',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };
}
