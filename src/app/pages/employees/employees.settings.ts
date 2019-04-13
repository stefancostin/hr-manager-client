import * as moment from 'moment';

export class EmployeesTableSettings {
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
      first_name: {
        title: 'First Name',
        type: 'string',
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
        valuePrepareFunction: (role) => {
          return role.code;
        }
      },
      team: {
        title: 'Team',
        type: 'string',
        valuePrepareFunction: (team) => {
          return team.code;
        }
      },
      hiring_date: {
        title: 'Hiring Date',
        type: 'number',
        valuePrepareFunction: (date) => {
          const momentHiringDate = moment(date, 'YYYY-MM-DD');
          return momentHiringDate.format('DD-MM-YYYY');
        }
      },
    },
  };
}
