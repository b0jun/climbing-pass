'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import Button from '../Button';

type Props = {
	onConfirm: (value: any) => void;
};

const Signature = ({ onConfirm }: Props) => {
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const [isSignEdit, setIsSignEdit] = useState(false);

	const startSign = () => {
		setIsSignEdit(true);
	};

	const clearSign = () => {
		setIsSignEdit(false);
		signCanvas.current.clear();
	};

	const submitSign = () => {
		const image = signCanvas.current.getTrimmedCanvas().toDataURL('image/png');
		onConfirm(image);
	};

	return (
		<div>
			<div className="relative h-[200px]">
				<div className="absolute z-20 flex items-center justify-center w-full h-full overflow-hidden border-2 border-gray-300 rounded-md bg-slate-100 opacity-90">
					<SignatureCanvas
						ref={signCanvas}
						canvasProps={{
							className: 'sigCanvas',
						}}
						onEnd={startSign}
						backgroundColor="rgb(241, 245, 249)"
					/>
				</div>
				{isSignEdit && (
					<button
						type="button"
						onClick={clearSign}
						className="absolute z-50 flex items-center justify-center w-6 h-6 transition rounded-sm top-1 right-1 duration-2000"
					>
						<Image src="/icons/ic_delete.svg" width={24} height={24} alt="eraser" />
					</button>
				)}
				<p className="absolute z-10 text-2xl font-bold text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
					서명
				</p>
			</div>
			<Button label="이용 동의 및 서명" onClick={submitSign} />
		</div>
	);
};

export default Signature;
