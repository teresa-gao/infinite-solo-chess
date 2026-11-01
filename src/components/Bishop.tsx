import Piece from './Piece.tsx'

interface BishopProps {
    isWhite: boolean;
}

export default function Bishop({ isWhite }: BishopProps) {
    return (
        <Piece
            abbreviation="b"
            isWhite={isWhite} />
    )
}
