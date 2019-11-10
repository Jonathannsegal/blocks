import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../../src/components/Map/Map'), {
	ssr: false
});

export default () => <DynamicComponentWithNoSSR />;
