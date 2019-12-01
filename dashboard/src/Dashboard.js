import React from 'react';
import {
  Grid,
  Image
} from 'semantic-ui-react';

export default () => (
    <Grid padded columns={2}>
        <Grid.Row >
            <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);
