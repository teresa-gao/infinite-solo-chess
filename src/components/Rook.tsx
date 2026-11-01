import Piece from './Piece.tsx'

interface RookProps {
    isWhite: boolean;
    dragId: string;
}

export default function Rook({ isWhite, dragId }: RookProps) {
    return (
        <Piece
            abbreviation="r"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
