import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
	return <section className='mx-auto w-11/12'>{children}</section>;
}
