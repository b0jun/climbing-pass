const gymKeys = {
	base: [{ scope: 'gym' }] as const,
	lists: () => [{ ...gymKeys.base[0], entity: 'passList' }] as const,
	list: (gym: string, passDate: string | null, passType: string | null) =>
		[{ ...gymKeys.lists()[0], gym, passDate, passType }] as const,
};

export { gymKeys };
