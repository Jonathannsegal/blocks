import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('./Map'), {
    ssr: false
});

export default () => <DynamicComponentWithNoSSR />;