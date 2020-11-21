import React from 'react';
import { Loader  } from 'semantic-ui-react';

const Preloader = ({size='medium'}) => (
    <div>
        <Loader size={size} active inline='centered' />
    </div>
  )
  
  export default Preloader