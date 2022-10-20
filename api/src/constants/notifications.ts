type NotifMessage = {
    type?: string;
    user?: string;
    fromUserName?: string;
    message?: string;
}

export const notifMessage = ({ type, user, message, fromUserName }: NotifMessage) => {

    let restMssg = message.length > 20 ? message.substring(0, 50) + "..." : message;

    switch (type) {
        case "post_tag":
            return `${fromUserName} tagged your department on a post: "${restMssg}"`
            break;

        case "post_comment":
            return `${fromUserName} commented on your post: "${restMssg}"`
            break;

        default:
            break;
    }

} 