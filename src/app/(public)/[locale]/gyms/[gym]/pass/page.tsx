import { PassClient } from './components';

export default async function PassPage() {
  return (
    <div className="via-contents relative flex w-full flex-1 flex-col bg-linear-to-b from-blue-100 to-blue-100">
      <div className="xs:px-10 flex flex-1 flex-col px-4">
        <div className="flex flex-1 flex-col justify-center">
          <PassClient />
        </div>
      </div>
    </div>
  );
}
