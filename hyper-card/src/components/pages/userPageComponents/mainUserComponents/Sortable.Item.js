import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GetShoutOut } from "./getshoutout";
export function SortableItem(props){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (

        <div ref = {setNodeRef} style = {style} {...attributes} {...listeners}>
            <GetShoutOut shout_out_uid = {props.shout_out_uid} text_color = {props.text_color}/>
        </div>
    )
}
//<GetShoutOut shout_out_uid = {shoutout} text_color = {text_color}/>