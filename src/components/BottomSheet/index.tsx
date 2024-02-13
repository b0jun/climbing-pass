import Image from 'next/image';
import React from 'react';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type Props = {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};
const BottomSheet = ({ open, onClose, title, children }: Props) => {
	useLockBodyScroll();
	return (
		<>
			<div
				className={`fixed inset-0 bg-gray-300 duration-200 ${
					open ? 'opacity-60' : 'opacity-0'
				}`}
			/>
			<div className="fixed inset-0 z-10 h-full max-w-xl mx-auto">
				<div className="flex items-end justify-center min-h-full">
					<div
						className={`p-4 w-full max-w-3xl relative rounded-t-3xl bg-white shadow-xl transition-all duration-200 ${
							open ? 'translate-y-0' : 'translate-y-full'
						}`}
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-bold">{title}</h2>
							<div>
								<button
									type="button"
									onClick={onClose}
									className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								>
									<Image
										src="/icons/ic_close.svg"
										alt="close"
										width={24}
										height={24}
									/>
								</button>
							</div>
						</div>
						<div>{children}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BottomSheet;
