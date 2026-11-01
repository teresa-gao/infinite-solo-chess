import Piece from './Piece.tsx'

interface RookProps {
    isWhite: boolean;
    dragId: string;
}

export default function Rook({ isWhite, dragId }: RookProps) {
    return (
        <Piece
            type="rook"
            isWhite={isWhite}
            dragId={dragId}
        />
    )
}
