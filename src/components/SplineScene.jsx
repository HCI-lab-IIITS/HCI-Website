import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Loader = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
    Loading 3D...
  </div>
);

const SplineScene = ({ scene, className, style }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Spline scene={scene} className={className} style={style} />
    </Suspense>
  );
};

export default SplineScene;


