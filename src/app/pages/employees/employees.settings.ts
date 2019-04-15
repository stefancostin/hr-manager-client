import * as moment from 'moment';
import { id } from '@swimlane/ngx-charts/release/utils';
import { R3_COMPILE_DIRECTIVE } from '@angular/core/src/ivy_switch/compiler';

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
      hiring_date: {
        title: 'Hiring Date',
        type: 'number',
        valuePrepareFunction: (date) => {
          const momentHiringDate = moment(date, 'YYYY-MM-DD');
          return momentHiringDate.format('DD-MM-YYYY');
        }
      },
      role: {
        title: 'Role',
        type: 'string',
        valuePrepareFunction: (role) => {
          return role.name;
        },
        filterFunction: (role: any, search: string) => {
          if (role.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return true;
          }
        },
      },
      team: {
        title: 'Team',
        type: 'string',
        valuePrepareFunction: (team) => {
          return team.code;
        },
        filterFunction: (team: any, search: string) => {
          if (team.code.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return true;
          }
        },
      },
    },
  };
}

// skills: {
//   title:"Skills",
//   valuePrepareFunction: (skills) => {
//     return skills.map(s => " " + s.name + " ").toString()
//   },
//   filterFunction(skills?: any, search?: string): boolean {
//     let match = skills.map(s => s.name).indexOf(search) > -1
//     if (match || search === '') {
//       return true;
//     } else {
//       return false;
//     }
//   },
