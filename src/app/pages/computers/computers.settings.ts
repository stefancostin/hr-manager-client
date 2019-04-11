export class ComputersTableSettings {
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
        employee: {
          title: 'Assigned To',
          type: 'string',
          valuePrepareFunction: (employee) => {
            if (employee) {
              return `${employee.first_name} ${employee.last_name}`;
            }
          }
        },
        operating_system: {
          title: 'Operating System',
          type: 'string',
        },
        cpu: {
          title: 'CPU',
          type: 'string',
        },
        ram: {
          title: 'RAM',
          type: 'string',
        },
        hdd: {
          title: 'HDD',
          type: 'string',
        },
        code: {
          title: 'Code',
          type: 'string',
          width: '100px'
        }
      },
    };
  }
