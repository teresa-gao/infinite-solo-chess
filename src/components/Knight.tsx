import Piece from './Piece.tsx'

interface KnightProps {
    isWhite: boolean;
}

export default function Knight({ isWhite }: KnightProps) {
    return (
        <Piece
            abbreviation="n"
            isWhite={isWhite} />
    )
}
