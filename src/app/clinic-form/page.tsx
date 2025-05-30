import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import ClinicForm from './components/form';

const ClinicFormPage = () => {
  return (
    <Dialog open>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Adicionar Clínica</DialogTitle>
          <DialogDescription>
            Adicione uma clinica para continuar
          </DialogDescription>
        </DialogHeader>
        <ClinicForm></ClinicForm>
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
