import Piece from './Piece.tsx'

interface KingProps {
    isWhite: boolean;
}

export default function King({ isWhite }: KingProps) {
    return (
        <Piece
            abbreviation="k"
            isWhite={isWhite} />
    )
}
