import { Lock } from "lucide-react";

type CommentMessageProps = { message: string; state: boolean };

export const CommentMessage = ({ message, state }: CommentMessageProps) => {
    return state ? (
        <p className="mb-4 text-sm text-red-300 italic dark:text-red-300">
         ce message a été supprimé par l'administrateur</p>
    ) : (
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">{message}</p>
    );
};
