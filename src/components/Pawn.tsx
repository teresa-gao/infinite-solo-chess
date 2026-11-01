import Piece from './Piece.tsx'

interface PawnProps {
    isWhite: boolean;
    dragId: string;
}

export default function Pawn({ isWhite, dragId }: PawnProps) {
    return (
        <Piece
            abbreviation="p"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
