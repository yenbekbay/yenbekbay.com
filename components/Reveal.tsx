import {Slot} from '@radix-ui/react-slot'
import type {HTMLMotionProps} from 'framer-motion'
import {motion, useAnimation, useInView} from 'framer-motion'
import React from 'react'
import {mergeRefs} from 'react-merge-refs'

export interface RevealProps extends HTMLMotionProps<'div'> {
  asChild?: boolean
}

export const Reveal = React.forwardRef(function Reveal(
  {asChild, ...restProps}: RevealProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const InternalRef = React.useRef<HTMLElement>(null)
  const inView = useInView(InternalRef, {once: true})
  const Comp = asChild ? Slot : 'div'
  const MotionComp = React.useMemo(
    () =>
      motion(Comp) as React.ComponentType<
        HTMLMotionProps<'div'> & {ref?: React.Ref<HTMLDivElement>}
      >,
    [Comp],
  )
  const animation = useAnimation()
  React.useEffect(() => {
    if (inView) {
      animation.start('visible')
    }
  }, [animation, inView])
  return (
    <MotionComp
      ref={mergeRefs([InternalRef, forwardedRef])}
      animate={animation}
      variants={itemVariants}
      initial="hidden"
      {...restProps}
    />
  )
})

export interface RevealGroupProps extends HTMLMotionProps<'div'> {
  asChild?: boolean
}

export const RevealGroup = React.forwardRef(function RevealGroup(
  {asChild, ...restProps}: RevealGroupProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const InternalRef = React.useRef<HTMLElement>(null)
  const inView = useInView(InternalRef, {once: true})
  const Comp = asChild ? Slot : 'div'
  const MotionComp = React.useMemo(
    () =>
      motion(Comp) as React.ComponentType<
        HTMLMotionProps<'div'> & {ref?: React.Ref<HTMLDivElement>}
      >,
    [Comp],
  )
  const animation = useAnimation()
  React.useEffect(() => {
    if (inView) {
      animation.start('visible')
    }
  }, [animation, inView])
  return (
    <MotionComp
      ref={mergeRefs([InternalRef, forwardedRef])}
      animate={animation}
      variants={containerVariants}
      initial="hidden"
      {...restProps}
    />
  )
})

export interface RevealGroupItemProps extends HTMLMotionProps<'div'> {
  asChild?: boolean
}

export const RevealGroupItem = React.forwardRef(function RevealGroupItem(
  {asChild, ...restProps}: RevealGroupItemProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div'
  const MotionComp = React.useMemo(
    () =>
      motion(Comp) as React.ComponentType<
        HTMLMotionProps<'div'> & {ref?: React.Ref<HTMLDivElement>}
      >,
    [Comp],
  )
  return (
    <MotionComp ref={forwardedRef} variants={itemVariants} {...restProps} />
  )
})

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.8,
    },
  },
}
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}
