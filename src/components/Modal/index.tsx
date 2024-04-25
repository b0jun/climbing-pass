import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type Props = {
	type?: 'default' | 'warn';
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	cancelLabel?: string;
	confirmLabel?: string;
	title: string;
	children?: React.ReactNode;
};

const confirmConfig = {
	default: {
		bgColor: 'bg-gray-800',
		hoverBgColor: 'hover:bg-gray-900',
		textColor: 'text-white',
		focusRingColor: 'focus:ring-gray-300',
	},
	warn: {
		bgColor: 'bg-error/90',
		hoverBgColor: 'hover:bg-error',
		textColor: 'text-white',
		focusRingColor: 'focus:ring-red-300',
	},
};

const Modal = ({ type = 'default', open, onClose, onConfirm, cancelLabel, confirmLabel, title, children }: Props) => {
	useLockBodyScroll();
	return (
		<>
			<div className={`fixed inset-0 bg-gray-300 duration-200 ${open ? 'opacity-60' : 'opacity-0'}`} />
			<div className="fixed inset-0 z-10 h-full max-w-md mx-auto">
				<div className="flex items-center justify-center min-h-full">
					<div
						className={`p-4 w-full max-w-3xl relative rounded-xl bg-white shadow-xl transition-all duration-200 ${
							open ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-bold">{title}</h2>
							<button
								type="button"
								onClick={onClose}
								className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							>
								<Image src="/icons/ic_close.svg" alt="close" width={24} height={24} />
							</button>
						</div>
						{children && <div>{children}</div>}
						<div className="flex gap-2 mt-4">
							<button
								onClick={onClose}
								type="button"
								className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
							>
								{cancelLabel ?? '취소'}
							</button>
							<button
								onClick={onConfirm}
								type="button"
								className={cn(
									'focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 w-full',
									confirmConfig[type].bgColor,
									confirmConfig[type].textColor,
									confirmConfig[type].hoverBgColor,
									confirmConfig[type].focusRingColor
								)}
							>
								{confirmLabel ?? '확인'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
