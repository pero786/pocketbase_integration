export default function AlertMessage(props) {
    return (<div role="alert" class={`text-white p-4 rounded w-lg text-3xl ${props.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
        {props.message}
    </div>
    );
}