import { ReactiveFormsModule } from '@angular/forms';

export class Owner {
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;

  accounts?: Account[];
}
