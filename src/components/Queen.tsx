import Piece from './Piece.tsx'

interface QueenProps {
    isWhite: boolean;
    dragId: string;
}

export default function Queen({ isWhite, dragId }: QueenProps) {
    return (
        <Piece
            abbreviation="q"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
