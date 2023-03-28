import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AutocompleteInput } from './AutocompleteInput';

export default {
    title: 'shared/AutocompleteInput',
    component: AutocompleteInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AutocompleteInput>;

const Template: ComponentStory<typeof AutocompleteInput> = (args) => <AutocompleteInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {};