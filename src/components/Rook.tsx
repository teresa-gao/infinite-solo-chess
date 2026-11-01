import Piece from './Piece.tsx'

interface RookProps {
    isWhite: boolean;
}

export default function Rook({ isWhite }: RookProps) {
    return (
        <Piece
            abbreviation="r"
            isWhite={isWhite} />
    )
}
