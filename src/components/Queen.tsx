import Piece from './Piece.tsx'

interface QueenProps {
    isWhite: boolean;
    dragId: string;
}

export default function Queen({ isWhite, dragId }: QueenProps) {
    return (
        <Piece
            type="q"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
