import Piece from './Piece.tsx'

interface QueenProps {
    isWhite: boolean;
}

export default function Queen({ isWhite }: QueenProps) {
    return (
        <Piece
            abbreviation="q"
            isWhite={isWhite} />
    )
}
