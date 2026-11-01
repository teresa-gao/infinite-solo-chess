import Piece from './Piece.tsx'

interface PawnProps {
    isWhite: boolean;
    dragId: string;
}

export default function Pawn({ isWhite, dragId }: PawnProps) {
    return (
        <Piece
            type="pawn"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
