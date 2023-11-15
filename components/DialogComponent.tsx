import { DialogComponentProps } from '@/types/typesDialog';
import { Dialog } from 'primereact/dialog';
import * as React from 'react';

export interface IDialogComponentProps {
    propsDialog: DialogComponentProps
    children: React.ReactNode
}

export const DialogComponent = (props: IDialogComponentProps) => {
    return (
        <Dialog header={props.propsDialog.header} visible={props.propsDialog.onVisible}
            onHide={props.propsDialog.onHide} className='w-11 md:w-8 xl:w-7'>
            {props.children}
        </Dialog>
    );
}
