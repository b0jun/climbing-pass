import { useMutation } from '@tanstack/react-query';

const mutationFn = async (body: any) => {
	await fetch('/api/pass/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
};

const useCreatePass = () => {
	return useMutation({ mutationFn });
};

export default useCreatePass;
