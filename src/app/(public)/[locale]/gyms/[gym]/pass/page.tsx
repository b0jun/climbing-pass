import { PassClient } from './components';

export default async function PassPage() {
  return (
    <div className="relative flex w-full flex-1 flex-col bg-gradient-to-b from-blue-100 via-contents to-blue-100">
      <div className="flex flex-1 flex-col px-4 xs:px-10">
        <div className="flex flex-1 flex-col justify-center">
          <PassClient />
        </div>
      </div>
    </div>
  );
}
