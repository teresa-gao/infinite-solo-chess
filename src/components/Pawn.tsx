import Piece from './Piece.tsx'

interface PawnProps {
    isWhite: boolean;
}

export default function Pawn({ isWhite }: PawnProps) {
    return (
        <Piece
            abbreviation="p"
            isWhite={isWhite} />
    )
}
