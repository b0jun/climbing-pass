import { redirect } from '@/navigation';

const ManagerPage = ({ params }: { params: { gym: string } }) => {
  redirect(`/${params.gym}/manager/passList`);
};

export default ManagerPage;
