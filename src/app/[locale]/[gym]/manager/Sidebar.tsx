'use client';
import { useState } from 'react';

const Sidebar = () => {
	return (
		<aside className={`w-[200px] p-[16px] fixed inset-y-0 left-0 bg-gray-400 transition-transform transform`}>
			<h2 className="text-xl mb-4">Sidebar</h2>
			<ul>
				<li className="mb-2">
					<a href="#">Item 1</a>
				</li>
				<li className="mb-2">
					<a href="#">Item 2</a>
				</li>
				<li className="mb-2">
					<a href="#">Item 3</a>
				</li>
			</ul>
		</aside>
	);
};

export default Sidebar;
